import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import CommonButton from "../common-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function CommonForm({ formControls = [], formData, btnText, handleSubmit }) {
  return (
    <Form {...formData}>
      <form onSubmit={formData.handleSubmit(handleSubmit)}>
        {formControls?.length > 0
          ? formControls.map((controlItem) => (
              <FormField
                key={controlItem.id}
                control={formData.control}
                name={controlItem.id}
                render={({ field }) => {
                  return (
                    <FormItem className="pb-2">
                      <FormLabel>{controlItem.label}</FormLabel>
                      {controlItem.componentType === "input" ? (
                        <FormControl>
                          <Input
                            placeholder={controlItem.placeholder}
                            type={controlItem.type}
                            {...field}
                            value={field.value}
                            className="w-full rounded h-[50px] border-none text-black bg-gray-200 text-[16px] outline-none drop-shadow-sm
                            transition-all duration-300 ease-in-out focus:bg-gray-100 focus:drop-shadow-lg focus-visible:outline-none focus-visible:right-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                      ) : controlItem.componentType === "select" ? (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              {field.value ? (
                                <SelectValue
                                  placeholder={controlItem.placeholder}
                                />
                              ) : (
                                "select"
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {controlItem.option.map((optionItem) => (
                              <SelectItem value={optionItem.id} key={optionItem.id}>
                                {optionItem.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : null}
                    </FormItem>
                  );
                }}
              />
            ))
          : null}
        <div className="pt-4 flex justify-center">
          <CommonButton btnText={btnText} className={"w-full"} />
        </div>
      </form>
    </Form>
  );
}

export default CommonForm;
