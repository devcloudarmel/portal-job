'use client';

import H1 from "@/components/h1";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createJobSchema, createJobValues } from "@/lib/validations";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-type";
import LocationSearchInput from "@/components/locationSearchInput";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import RichTextEditot from "@/components/rich-text-editot";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";
import { createJobPosting } from "@/actions/job";

export default function NewJobForm () {
    const form = useForm<createJobValues>({
        resolver: zodResolver(createJobSchema)
    })

    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState: { isSubmitting }
    } = form;

    async function onSubmit (values: createJobValues) {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        })

        try {
            await createJobPosting(formData);
            toast.error("Job created", {
                description: "The admin will approve this job after publishing it.",
                action: {
                    label: "Done",
                    onClick: () => console.log("Done"),
                },
            })
        } catch (error){
            toast.error("Something went wrong", {
                description: "Please try again",
                action: {
                    label: "Failed",
                    onClick: () => console.log("Failed"),
                },
            })
        }
    }

    return (
        <main className="max-w-7xl m-auto px-3 my-10 space-y-10">
            <div className="text-start space-y-1">
                <H1>Find your perfect developer</H1>
                <p className="text-muted-foreground">Get your posting seen by thousands of jobs seekers.</p>
            </div>
            <div className="space-y-6 border rounded-lg p-4">
                <div>
                    <h2 className="font-semibold">Job details</h2>
                    <p className="text-muted-foreground">Provide a job description and details</p>
                </div>
                <Form {...form}>
                    <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <FormField 
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="e.g Frontend Developer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job type</FormLabel>
                                    <FormControl>
                                        <Select {...field} defaultValue="">
                                            <option value="" hidden>
                                                Select an option
                                            </option>
                                            {jobTypes.map(jobType => (
                                                <option value={jobType} key={jobType}>
                                                    {jobType}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="e.g Company"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                           control={control}
                           name="companyLogo"
                           render={({ field: { value, ...fieldValues } }) => (
                               <FormItem>
                                   <FormLabel>Company Logo</FormLabel>
                                   <FormControl>
                                       <Input
                                            type="file"
                                            accept="image/*"
                                            {...fieldValues}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                fieldValues.onChange(file)
                                            }}
                                       />
                                   </FormControl>
                                   <FormMessage />
                               </FormItem>
                           )}
                        />
                        <FormField 
                            control={control}
                            name="locationType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location type</FormLabel>
                                    <FormControl>
                                        <Select 
                                            {...field} 
                                            defaultValue=""
                                            onChange={(e) => {
                                                field.onChange(e);
                                                if (e.currentTarget.value === "Remote") {
                                                    trigger("location")
                                                }
                                            }}
                                        >
                                            <option value="" hidden>
                                                Select an option
                                            </option>
                                            {locationTypes.map(locationType => (
                                                <option value={locationType} key={locationType}>
                                                    {locationType}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Office Location</FormLabel>
                                    <FormControl>
                                        <LocationSearchInput 
                                            onLocationSelected={field.onChange}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    {watch("location") && (
                                        <div className="flex items-center gap-1">
                                            <Button 
                                                className="bg-muted-foreground hover:bg-muted-foreground"
                                                size="sm"
                                                type="button"
                                                onClick={() => {
                                                    setValue("location", "", {shouldValidate: true})
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                            <Button 
                                                size="sm"
                                                className="text-sm bg-muted-foreground hover:bg-muted-foreground"
                                            >
                                                {watch("location")}
                                            </Button>
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <Label htmlFor="applicationEmail">
                                How to apply
                            </Label>
                            <div className="flex justify-between">
                                <FormField 
                                    control={control}
                                    name="applicationEmail"
                                    render={({ field }) => (
                                        <FormItem className="grow">
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Input 
                                                        id="applicationEmail"
                                                        placeholder="Email"
                                                        type="email"
                                                        {...field}          
                                                    />
                                                    <span className="mx-2">OR</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={control}
                                    name="applicationUrl"
                                    render={({ field }) => (
                                        <FormItem className="grow">
                                            <FormControl>
                                                <Input 
                                                    placeholder="Website"
                                                    type="url"
                                                    {...field}  
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        trigger("applicationEmail")
                                                    }}        
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField 
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <Label onClick={() => setFocus("description")}>Description</Label>
                                    <FormControl>
                                        <RichTextEditot 
                                            onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton 
                            type="submit" 
                            loading={isSubmitting}
                        > Send
                        </LoadingButton>
                    </form> 
                </Form>
            </div>
        </main>
    )
}