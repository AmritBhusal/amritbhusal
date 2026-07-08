"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Send, User, Mail, Phone, MessageCircle, Briefcase } from "lucide-react";
import taskData from "./Form.json";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  task: z.string(),
  contact: z.string().min(10, "Contact must be at least 10 numbers"),
  message: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_w6m1039",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_1da7yz9",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "2Qc-EkZWztO3gSPrZ",
};

export default function ContactForm() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      task: "",
      contact: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);

      const selectedTask = taskData.tasks.find((t) => t.id === values.task);
      const taskName = selectedTask?.name || "Not specified";

      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        contact_number: values.contact,
        selected_service: taskName,
        total_amount: `Rs. ${totalAmount.toLocaleString()}`,
        message: values.message,
        to_name: "Amrit Bhusal",
      };

      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );

      if (response.status === 200) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        });
        form.reset();
        setTotalAmount(0);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[#1b1712] py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-[#1b1712] rounded-md border border-[#3a3128]">
          <div className="bg-[#221d17] px-8 py-8 text-[#ebdbb2] relative overflow-hidden border-b border-[#3a3128] rounded-t-md">
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2b241b] rounded-full mb-4 border border-[#3a3128]">
                <MessageCircle size={28} className="text-[#a89984]" />
              </div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight text-[#ebdbb2]">
                Get In Touch
              </h2>
              <p className="text-[#a89984] text-base max-w-2xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? Let's discuss your project
                requirements and create something amazing together.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[#ebdbb2] font-medium flex items-center gap-2 text-sm">
                          <User size={16} className="text-[#a89984]" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            className="h-10 border-[#3a3128] focus:border-[#1793d1] focus:shadow-[0_0_0_3px_rgba(23,147,209,0.15)] rounded-md transition-all duration-200 bg-[#1b1712] hover:bg-[#221d17] focus:bg-[#1b1712] text-[#ebdbb2] placeholder-[#a89984]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#f85149]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[#ebdbb2] font-medium flex items-center gap-2 text-sm">
                          <Mail size={16} className="text-[#a89984]" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            type="email"
                            {...field}
                            className="h-10 border-[#3a3128] focus:border-[#1793d1] focus:shadow-[0_0_0_3px_rgba(23,147,209,0.15)] rounded-md transition-all duration-200 bg-[#1b1712] hover:bg-[#221d17] focus:bg-[#1b1712] text-[#ebdbb2] placeholder-[#a89984]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#f85149]" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[#ebdbb2] font-medium flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-[#a89984]" />
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="98xxxxxxxx"
                            {...field}
                            className="h-10 border-[#3a3128] focus:border-[#1793d1] focus:shadow-[0_0_0_3px_rgba(23,147,209,0.15)] rounded-md transition-all duration-200 bg-[#1b1712] hover:bg-[#221d17] focus:bg-[#1b1712] text-[#ebdbb2] placeholder-[#a89984]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#f85149]" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="task"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[#ebdbb2] font-medium flex items-center gap-2 text-sm">
                        <Briefcase size={16} className="text-[#a89984]" />
                        Service Needed
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const svc = taskData.tasks.find((t) => t.id === e.target.value);
                            setTotalAmount(svc?.price ?? 0);
                          }}
                          className="h-10 w-full px-3 border-[#3a3128] focus:border-[#1793d1] rounded-md transition-all duration-200 bg-[#1b1712] hover:bg-[#221d17] focus:bg-[#1b1712] text-[#ebdbb2] text-sm focus:outline-none"
                        >
                          <option value="">Select a service (optional)</option>
                          {taskData.tasks.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} — Rs. {t.price.toLocaleString()}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      {totalAmount > 0 && (
                        <p className="text-xs text-[#a89984]">
                          Estimated starting price:{" "}
                          <span className="text-[#1793d1] font-semibold">
                            Rs. {totalAmount.toLocaleString()}
                          </span>
                        </p>
                      )}
                      <FormMessage className="text-[#f85149]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[#ebdbb2] font-medium flex items-center gap-2 text-sm">
                        <MessageCircle size={16} className="text-[#a89984]" />
                        Project Details
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project, goals, timeline, and any specific requirements you have in mind..."
                          maxLength={1000}
                          className="min-h-[120px] border-[#3a3128] focus:border-[#1793d1] focus:shadow-[0_0_0_3px_rgba(23,147,209,0.15)] rounded-md resize-none transition-all duration-200 bg-[#1b1712] hover:bg-[#221d17] focus:bg-[#1b1712] text-[#ebdbb2] placeholder-[#a89984]"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex items-center justify-between">
                        <FormMessage className="text-[#f85149]" />
                        <span className="ml-auto font-mono text-xs text-[#5c5040]">
                          {field.value?.length ?? 0}/1000
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#238636] text-white hover:bg-[#2ea043] font-semibold rounded-md border border-[rgba(240,246,252,0.1)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="text-center mt-6 text-[#a89984] text-sm">
          <p>I typically respond within 24 hours</p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
