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
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-card rounded-none shadow-none border border-border backdrop-blur-sm">
          <div className="bg-muted px-8 py-12 text-foreground relative overflow-hidden border-b border-border">
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-6 border border-border">
                <MessageCircle size={32} className="text-foreground" />
              </div>
              <h2 className="text-4xl font-bold mb-3 tracking-tight text-foreground">
                Get In Touch
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? Let's discuss your project
                requirements and create something amazing together.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-foreground font-semibold flex items-center gap-2">
                          <User size={18} className="text-muted-foreground" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            className="h-12 border-border focus:border-foreground rounded-none transition-all duration-200 bg-background hover:bg-muted focus:bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-foreground font-semibold flex items-center gap-2">
                          <Mail size={18} className="text-muted-foreground" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            type="email"
                            {...field}
                            className="h-12 border-border focus:border-foreground rounded-none transition-all duration-200 bg-background hover:bg-muted focus:bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-foreground font-semibold flex items-center gap-2">
                          <Phone size={18} className="text-muted-foreground" />
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="98xxxxxxxx"
                            {...field}
                            className="h-12 border-border focus:border-foreground rounded-none transition-all duration-200 bg-background hover:bg-muted focus:bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-foreground font-semibold flex items-center gap-2">
                        <MessageCircle size={18} className="text-muted-foreground" />
                        Project Details
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project, goals, timeline, and any specific requirements you have in mind..."
                          className="min-h-[140px] border-border focus:border-foreground rounded-none resize-none transition-all duration-200 bg-background hover:bg-muted focus:bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-foreground text-background hover:bg-muted-foreground font-semibold rounded-none border border-border hover:border-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
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

        <div className="text-center mt-8 text-muted-foreground">
          <p>I typically respond within 24 hours</p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
