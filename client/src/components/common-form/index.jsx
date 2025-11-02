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
                      <FormLabel className="text-gray-800">
                        {controlItem.label}
                      </FormLabel>
                      {controlItem.componentType === "input" ? (
                        <FormControl>
                          <Input
                            placeholder={controlItem.placeholder}
                            type={controlItem.type}
                            {...field}
                            value={field.value}
                            className="w-full rounded h-[50px] border border-gray-300 text-gray-900 bg-white text-[16px] outline-none drop-shadow-sm
                            transition-all duration-300 ease-in-out focus:bg-gray-50 focus:drop-shadow-lg focus:border-blue-500 focus-visible:outline-none focus-visible:ring-offset-0"
                          />
                        </FormControl>
                      ) : controlItem.componentType === "select" ? (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[180px] border border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:ring-1">
                              {field.value ? (
                                <SelectValue
                                  placeholder={controlItem.placeholder}
                                />
                              ) : (
                                <span className="text-gray-500">select</span>
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border border-gray-200 text-gray-900 shadow-lg">
                            {controlItem.option.map((optionItem) => (
                              <SelectItem
                                value={optionItem.id}
                                key={optionItem.id}
                              >
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
          <CommonButton
            btnText={btnText}
            className={"w-full bg-blue-600 hover:bg-blue-700 text-white"}
          />
        </div>
      </form>
    </Form>
  );
}

export default CommonForm;
