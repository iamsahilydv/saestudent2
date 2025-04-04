"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Info, CreditCard, Check, AlertCircle } from "lucide-react";

interface EventRegistrationProps {
  event: {
    id: number;
    title: string;
    image: string;
    date: string;
    time: string;
    location: string;
    registrationFee: number;
    registrationDeadline: string;
    description: string;
    requirements: string[];
    tags: string[];
  };
}

export default function EventRegistration({ event }: EventRegistrationProps) {
  const [step, setStep] = useState<'details' | 'form' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    saeId: "",
    teamName: "",
    teamSize: "",
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'upi' | 'netbanking'>('credit');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear errors when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.institution.trim()) newErrors.institution = "Institution name is required";
    if (!formData.saeId.trim()) newErrors.saeId = "SAE Membership ID is required";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 'details') {
      setStep('form');
    } else if (step === 'form') {
      if (validateForm()) {
        setStep('payment');
      }
    } else if (step === 'payment') {
      // In a real app, handle payment processing here
      setStep('confirmation');
    }
  };

  const handleBack = () => {
    if (step === 'form') {
      setStep('details');
    } else if (step === 'payment') {
      setStep('form');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'details' || step === 'form' || step === 'payment' || step === 'confirmation' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              <Info className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Details</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step === 'form' || step === 'payment' || step === 'confirmation' ? 'bg-primary' : 'bg-muted'}`} />
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'form' || step === 'payment' || step === 'confirmation' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              <Calendar className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Registration</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step === 'payment' || step === 'confirmation' ? 'bg-primary' : 'bg-muted'}`} />
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'payment' || step === 'confirmation' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Payment</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step === 'confirmation' ? 'bg-primary' : 'bg-muted'}`} />
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              <Check className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      {/* Event Details */}
      {step === 'details' && (
        <div className="space-y-6">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>
                    Important information about this event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {event.requirements.map((requirement, i) => (
                        <li key={i}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Registration Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Registration Fee:</span>
                      <span className="font-medium">₹{event.registrationFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Deadline:</span>
                      <span className="font-medium">{event.registrationDeadline}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      * You must have a valid SAE membership to register for this event.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      * Registration fees are non-refundable after the deadline.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleNext}>
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {step === 'form' && (
        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill out all required fields to register for {event.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name *
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="institution" className="text-sm font-medium">
                  Institution/College *
                </label>
                <Input
                  id="institution"
                  name="institution"
                  placeholder="Enter your institution name"
                  value={formData.institution}
                  onChange={handleInputChange}
                />
                {errors.institution && (
                  <p className="text-sm text-destructive">{errors.institution}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="saeId" className="text-sm font-medium">
                  SAE Membership ID *
                </label>
                <Input
                  id="saeId"
                  name="saeId"
                  placeholder="Enter your SAE ID"
                  value={formData.saeId}
                  onChange={handleInputChange}
                />
                {errors.saeId && (
                  <p className="text-sm text-destructive">{errors.saeId}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="teamName" className="text-sm font-medium">
                  Team Name (if applicable)
                </label>
                <Input
                  id="teamName"
                  name="teamName"
                  placeholder="Enter your team name"
                  value={formData.teamName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="teamSize" className="text-sm font-medium">
                  Team Size (if applicable)
                </label>
                <Input
                  id="teamSize"
                  name="teamSize"
                  type="number"
                  placeholder="Enter number of team members"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-start gap-2 mb-4">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className="mt-1"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the terms and conditions, including the SAE competition rules, code of conduct, and privacy policy.
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
              )}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">
                By registering for this event, you confirm that all information provided is accurate and you meet the eligibility requirements. Registration fees are non-refundable after the registration deadline.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>
              Proceed to Payment
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Payment Section */}
      {step === 'payment' && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Complete your registration by paying the fee of ₹{event.registrationFee.toLocaleString('en-IN')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="credit">Credit/Debit Card</TabsTrigger>
                <TabsTrigger value="upi">UPI</TabsTrigger>
                <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
              </TabsList>

              <TabsContent value="credit" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVV</label>
                    <Input placeholder="123" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name on Card</label>
                  <Input placeholder="John Doe" />
                </div>
              </TabsContent>

              <TabsContent value="upi" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">UPI ID</label>
                  <Input placeholder="yourname@upi" />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-center">
                    You will receive a payment request on your UPI app after clicking "Pay Now"
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="netbanking" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank"].map(bank => (
                    <Button key={bank} variant="outline" className="h-20 flex flex-col gap-2 justify-center">
                      <span>{bank}</span>
                    </Button>
                  ))}
                </div>
                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium">Other Banks</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Select Bank</option>
                    <option>Bank of Baroda</option>
                    <option>Punjab National Bank</option>
                    <option>Canara Bank</option>
                    <option>Union Bank</option>
                  </select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>₹{event.registrationFee.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                (Includes all taxes and processing fees)
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>
              Pay Now
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Confirmation */}
      {step === 'confirmation' && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader className="text-center pb-2">
            <Check className="h-16 w-16 text-primary mx-auto mb-2" />
            <CardTitle className="text-xl">Registration Complete!</CardTitle>
            <CardDescription>
              You have successfully registered for {event.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-background rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Registration Details</h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-muted-foreground">Registration ID:</div>
                <div className="font-medium">REG-{Math.floor(100000 + Math.random() * 900000)}</div>

                <div className="text-muted-foreground">Event:</div>
                <div className="font-medium">{event.title}</div>

                <div className="text-muted-foreground">Date:</div>
                <div className="font-medium">{event.date}</div>

                <div className="text-muted-foreground">Amount Paid:</div>
                <div className="font-medium">₹{event.registrationFee.toLocaleString('en-IN')}</div>

                <div className="text-muted-foreground">Payment Status:</div>
                <div className="text-primary font-medium">Successful</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium">What's Next?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span>A confirmation email has been sent to your registered email address.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span>You can view your registration details in the "My Events" section.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span>You'll receive event updates and instructions via email.</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">
              Go to My Events
            </Button>
            <Button variant="outline" className="w-full">
              Download Registration Receipt
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
