import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const FormikWrapper = ({ className, form, onSubmit, children }) => {
  return (
    <Form {...form}>
      <form className={cn(className)} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </Form>
  );
};

export default FormikWrapper;
