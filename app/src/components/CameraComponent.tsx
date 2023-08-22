import { useEffect, useState } from "react";
import { CameraType, Camera } from "expo-camera";
import { Box, Button, View } from "native-base";

export default function CameraComponent() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    requestPermission();
  }, []);
  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View h="100%">
      <Camera style={{ flex: 1 }} type={type}>
        <Button onPress={toggleCameraType}>Trocar de câmera</Button>
      </Camera>
    </View>
  );
}
