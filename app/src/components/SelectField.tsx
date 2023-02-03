import { useField } from "formik";
import { FormControl, Select, Text, WarningOutlineIcon } from "native-base";

export default function SelectField(props: any) {
  const [field, meta] = useField(props);
  return (
    <FormControl {...props} isInvalid={(meta.error ? true : false) && meta.touched}>
      <FormControl.Label>
        <Text color="gray.50">{props.label}</Text>
      </FormControl.Label>
      <Select bgColor="gray.50" borderWidth="0" borderRadius={6} size="md" h="50" {...field} {...props}></Select>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{meta.error}</FormControl.ErrorMessage>
    </FormControl>
  );
}
