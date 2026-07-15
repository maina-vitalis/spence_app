"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
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

const formAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const inputAnimation = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

function ReachOut() {
  const formSchema = z.object({
    name: z.string().min(1, "A name is required"),
    email: z.string().email("A valid email is required"),
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
      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
    },
    onError: (error: unknown) => {
      const message =
        axios.isAxiosError(error) && error.response?.data?.error
          ? typeof error.response.data.error === "string"
            ? error.response.data.error
            : "Please check the form and try again."
          : "Failed to send message. Please try again.";
      toast.error(message);
      console.error("Error sending email:", error);
    },
  });

  const onSubmit = (data: formTypes) => {
    mutate(data);
  };

  return (
    <div className="rounded-lg">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center font-semibold text-xl mb-3"
      >
        Get in touch
      </motion.h2>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="w-full md:max-w-[950px] mx-auto rounded-2xl p-5 relative">
          <ShineBorder shineColor={["#2B7FFF"]} />
          <Form {...form}>
            <motion.form
              variants={formAnimation}
              initial="hidden"
              animate="show"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <motion.div
                variants={formAnimation}
                className="flex flex-col gap-5 md:flex-row"
              >
                <motion.div className="flex-1" variants={inputAnimation}>
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="bg-white placeholder:text-xs"
                            placeholder="john doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div className="flex-1" variants={inputAnimation}>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="bg-white placeholder:text-xs"
                            placeholder="johndoe@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={inputAnimation}>
                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-white placeholder:text-xs"
                          placeholder="Message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                variants={inputAnimation}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LoadingButton loading={isPending} className="w-full">
                  Submit
                </LoadingButton>
              </motion.div>
            </motion.form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ReachOut;
