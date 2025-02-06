'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"  
import emailjs from '@emailjs/browser';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import taskData from './Form.json'

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  task: z.string(),
  contact: z.string().min(10, "Contact must be at least 10 numbers"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type FormValues = z.infer<typeof formSchema>

      const emailConfig = {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_w6m1039',
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_1da7yz9',
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '2Qc-EkZWztO3gSPrZ'
      }

export default function ContactForm() {
  const [totalAmount, setTotalAmount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      task: "",
      contact: "",
      message: "",
    },
  })

 async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true)
      
      const selectedTask = taskData.tasks.find(t => t.id === values.task)
      const taskName = selectedTask?.name || 'Not specified'
      
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        contact_number: values.contact,
        selected_service: taskName,
        total_amount: `$${totalAmount.toLocaleString()}`,
        message: values.message,
        to_name: "Amrit Bhusal", 
      }

      // Use the config object here
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      )

      if (response.status === 200) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        })
        form.reset()
        setTotalAmount(0)
      }
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to send message. Please try again."

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateTotal = (taskId: string, contact: number) => {
    const task = taskData.tasks.find(t => t.id === taskId)
    if (task) {
      setTotalAmount(task.price * contact)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Contact Me</h2>
        <p className="text-gray-500">Let us discuss your project requirements</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">            

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="98xxxxxxxx" {...field} />
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
              <FormItem>
                <FormLabel>Project Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe your project requirements..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  )
}