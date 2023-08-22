import React, { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

export type Value = { action: Actions; function: Functions; value: any };

type OfflineQueueType = {
  enqueue: (value: Value) => void;
  dequeue: () => void;
  isEmpty: () => boolean;
  getQueue: () => Value[];
};

type Actions = "Post" | "Put" | "Delete";
type Functions = "Auth" | "Supply"; // construir um tipo com as rotas da api, disponivel globalmente

type Node = {
  value: Value;
  next: Node | null;
};

const OfflineQueue = createContext<OfflineQueueType>({} as OfflineQueueType);

const OfflineQueueProvider = ({ children }: any) => {
  const [front, setFront] = useState<Node | null | undefined>(null);
  const [back, setBack] = useState<Node | null | undefined>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  async function init() {
    const localFront = await AsyncStorage.getItem("front");
    const localBack = await AsyncStorage.getItem("front");
    localFront && setFront(JSON.parse(localFront));
    localBack && setBack(JSON.parse(localBack));
  }

  useEffect(() => {
    init();
    const unsubscribe = NetInfo.addEventListener((state) => setIsConnected(state.isInternetReachable as boolean));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("front", JSON.stringify(front));
  }, [front]);
  useEffect(() => {
    AsyncStorage.setItem("back", JSON.stringify(back));
  }, [back]);

  const isEmpty = useCallback(() => {
    return !front;
  }, [front]);

  const enqueue = useCallback(
    (value: Value) => {
      const node: Node = { value, next: null };
      if (isEmpty()) {
        setFront(node);
        setBack(node);
        return;
      }
      setBack({ ...back, next: node } as Node);
    },
    [back, isEmpty]
  );

  const dequeue = useCallback(() => {
    const node = front;
    if (isEmpty()) setFront((state) => state?.next);
    if (!front) setBack(null);
    return node;
  }, [front, isEmpty]);

  const getQueue = useCallback(() => {
    if (isEmpty()) "Queue is empty";
    const tempArr = [];
    let temp = front;
    while (temp) {
      tempArr.push(temp.value);
      temp = temp.next;
    }
    return tempArr;
  }, [front, isEmpty]);

  const sync = useCallback(async () => {
    if (!isEmpty()) {
      const queue = getQueue();
      for (const item of queue) {
        let uri = "";
        switch (item.function) {
          case "Supply":
            uri = "http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/supply";
            break;
        }
        // implement dynamic action [put, post, delete]
        const response = await axios.post<{ success: boolean; message: string }[]>(uri, item.value);
        if (response.data[0].success) dequeue();
      }
    }
  }, [isEmpty, getQueue]);

  useEffect(() => {
    console.log(isConnected);
    isConnected && sync();
  }, [isConnected]);

  return <OfflineQueue.Provider value={{ enqueue, dequeue, getQueue, isEmpty }}>{children}</OfflineQueue.Provider>;
};

export { OfflineQueue, OfflineQueueProvider };
