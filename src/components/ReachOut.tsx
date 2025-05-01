"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import LoadingButton from "./LoadingButton";
import { ShineBorder } from "./magicui/shine-border";

function ReachOut() {
  const formSchema = z.object({
    name: z.string().min(1, "A name is required"),
    email: z.string().min(1, "An Email is required"),
    message: z.string().min(10, "A message is required atleast 10 characters"),
  });

  type formTypes = z.infer<typeof formSchema>;

  const form = useForm<formTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation<void, unknown, formTypes>({
    mutationFn: async (data: formTypes) => {
      const resp = await axios.post("/api/contact", data);
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Email sent successfully!");
    },
    onError: (error) => {
      toast.error("Failed to send email. Please try again.");
      console.error("Error sending email:", error);
    },
  });

  const onSubmit = (data: formTypes) => {
    mutate(data);
  };
  return (
    <div className="rounded-lg p-5">
      <h2 className="text-center font-semibold text-xl mb-3">Get in touch</h2>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="w-full md:max-w-[950px] mx-auto rounded-2xl p-5 relative">
          <ShineBorder shineColor={["#2B7FFF"]} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="bg-white"
                          placeholder="john doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="bg-white"
                          placeholder="johndoe@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white"
                        placeholder="Message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton loading={isPending} className="w-full">
                Submit
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ReachOut;
