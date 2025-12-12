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
import { Send, User, Mail, Phone, MessageCircle } from "lucide-react";
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
        total_amount: `$${totalAmount.toLocaleString()}`,
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
    <div className="bg-[#0d1117] py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-[#0d1117] rounded-md border border-[#30363d]">
          <div className="bg-[#161b22] px-8 py-8 text-[#c9d1d9] relative overflow-hidden border-b border-[#30363d] rounded-t-md">
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#21262d] rounded-full mb-4 border border-[#30363d]">
                <MessageCircle size={28} className="text-[#8b949e]" />
              </div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight text-[#c9d1d9]">
                Get In Touch
              </h2>
              <p className="text-[#8b949e] text-base max-w-2xl mx-auto leading-relaxed">
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
                        <FormLabel className="text-[#c9d1d9] font-medium flex items-center gap-2 text-sm">
                          <User size={16} className="text-[#8b949e]" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            className="h-10 border-[#30363d] focus:border-[#58a6ff] rounded-md transition-all duration-200 bg-[#0d1117] hover:bg-[#161b22] focus:bg-[#0d1117] text-[#c9d1d9] placeholder-[#8b949e]"
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
                        <FormLabel className="text-[#c9d1d9] font-medium flex items-center gap-2 text-sm">
                          <Mail size={16} className="text-[#8b949e]" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            type="email"
                            {...field}
                            className="h-10 border-[#30363d] focus:border-[#58a6ff] rounded-md transition-all duration-200 bg-[#0d1117] hover:bg-[#161b22] focus:bg-[#0d1117] text-[#c9d1d9] placeholder-[#8b949e]"
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
                        <FormLabel className="text-[#c9d1d9] font-medium flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-[#8b949e]" />
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="98xxxxxxxx"
                            {...field}
                            className="h-10 border-[#30363d] focus:border-[#58a6ff] rounded-md transition-all duration-200 bg-[#0d1117] hover:bg-[#161b22] focus:bg-[#0d1117] text-[#c9d1d9] placeholder-[#8b949e]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#f85149]" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[#c9d1d9] font-medium flex items-center gap-2 text-sm">
                        <MessageCircle size={16} className="text-[#8b949e]" />
                        Project Details
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project, goals, timeline, and any specific requirements you have in mind..."
                          className="min-h-[120px] border-[#30363d] focus:border-[#58a6ff] rounded-md resize-none transition-all duration-200 bg-[#0d1117] hover:bg-[#161b22] focus:bg-[#0d1117] text-[#c9d1d9] placeholder-[#8b949e]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[#f85149]" />
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

        <div className="text-center mt-6 text-[#8b949e] text-sm">
          <p>I typically respond within 24 hours</p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
