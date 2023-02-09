import { FieldHookConfig, useField } from "formik";
import { FormControl, Input, Text, WarningOutlineIcon, IInputProps } from "native-base";

export default function TextField(props: FieldHookConfig<string> & { name: string; label: string } & IInputProps) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error ? true : false}>
      <FormControl.Label>
        <Text color="gray.50">{props.label}</Text>
      </FormControl.Label>
      <Input borderColor="error.400" bgColor="gray.50" borderWidth={meta.error ? 2 : 0} borderRadius={6} size="md" h="50" {...field} {...props} />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{meta.error}</FormControl.ErrorMessage>
    </FormControl>
  );
}
