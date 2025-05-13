"use client";

import ContactForm from "@/components/contact/contactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ContactFormValues, ContactKeys } from "@/schemas";

import { Plus } from "lucide-react";
import { useState } from "react";

const contactData: {
  id: number;
  key: ContactKeys;
  value: string;
}[] = [
  { id: 1, key: "phone", value: "+966 18637 1873" },
  { id: 2, key: "facebook", value: "https://www.facebook.com/example" },
  { id: 3, key: "x", value: "https://www.twitter.com/example" },
  { id: 4, key: "instagram", value: "https://www.instagram.com/example" },
  { id: 5, key: "address", value: "الرياض, المملكة العربية السعودية" },
  { id: 6, key: "email", value: "example@gmail.com" },
  { id: 7, key: "appointments", value: "يوميا, 08:00 صباحا حتي 04:00 مساء" },
];

const getLabel = (key: string) => {
  const labels: Record<string, string> = {
    email: "Email",
    address: "Address",
    appointments: "Appointments",
    phone: "Phone",
    facebook: "Facebook",
    x: "Twitter",
    instagram: "Instagram",
  };
  return labels[key] || key;
};
const contactObj = contactData.reduce((acc, item) => {
  return { ...acc, [item.key]: item.value };
}, {} as ContactFormValues);
function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Contact Information</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger >
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[80vh]">
            <DialogHeader>
              <DialogTitle>Edit Contact Information</DialogTitle>
            </DialogHeader>
            <ContactForm
              contactInfo={contactObj}
              setIsModalOpen={setIsModalOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {contactData.map(({ id, key, value }) => {
          return (
            <Card key={id} className="hover:shadow-sm !gap-3">
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-sm font-medium">
                  {getLabel(key)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="text-sm text-muted-foreground">
                  <p>{value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Contact;
