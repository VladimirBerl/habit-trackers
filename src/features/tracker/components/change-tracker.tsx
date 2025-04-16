"use client";

import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AutoWidthInput } from "@/components/custom-input";

import { createTrackerSchema, weekDays, targetsCompliance } from "../schemas";
import { useTrackerStore } from "@/store/useTrackerStore";
import { useRouter } from "next/navigation";

type formSchema = z.infer<typeof createTrackerSchema>;

interface ChangeTrackerProps {
  id: string;
}

export const ChangeTracker = ({ id }: ChangeTrackerProps) => {
  const router = useRouter();
  const { getTracker, updateTracker } = useTrackerStore();
  const initialTracker = getTracker(id);

  const form = useForm<formSchema>({
    resolver: zodResolver(createTrackerSchema),
    defaultValues: {
      id: initialTracker?.id || "",
      description: initialTracker?.description || "",
      repeat: initialTracker?.repeat || 1,
      weekday: initialTracker?.weekday || [0, 1, 2, 3, 4, 5, 6],
      target: initialTracker?.target || targetsCompliance[0].value,
      completedDays: initialTracker?.completedDays || {},
      createdAt: initialTracker?.createdAt || new Date().toISOString(),
    },
  });

  const onSubmit = (values: formSchema) => {
    updateTracker(id, (t) => ({ ...t, ...values }));
    router.push("/trackers-calendar")
  };

  if (!initialTracker) {
    return (
      <div>
        <div className="text-center">Tracker not found</div>
        <Button onClick={() => router.back()}>Back</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between gap-4 h-full">
        <Image className="mx-auto" src="/images/duck-stay.png" width={200} height={200} alt="duck-stay" />
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-0 gap-0 mb-2">
                <FormLabel className="text-[2.125rem] font-bold leading-[2.125rem] uppercase">I want</FormLabel>
                <FormControl>
                  <AutoWidthInput placeholder="TO DO SOMETHING" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeat"
            render={({ field }) => (
              <FormItem className="space-y-0 gap-0">
                <div className="flex gap-1">
                  <FormControl>
                    <AutoWidthInput
                      className="w-[2.5ch]"
                      placeholder="12"
                      disabledWidth={true}
                      type="number"
                      inputMode="decimal"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel className="text-[2.125rem] font-bold leading-[2.125rem] uppercase w-full">Per day</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weekday"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-wrap gap-2 justify-between my-8 px-2.5">
                  {weekDays.map((day) => {
                    const isChecked = field.value?.includes(day.value);
                    const toggle = () => {
                      const newValue = isChecked ? field.value.filter((v) => v !== day.value) : [...field.value, day.value];
                      field.onChange(newValue);
                    };
                    return (
                      <div key={day.value} className="flex flex-col items-center gap-1 cursor-pointer">
                        <p className="text-sm font-medium">{day.label}</p>
                        <Checkbox checked={isChecked} onCheckedChange={toggle} className="rounded-full" />
                      </div>
                    );
                  })}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-wrap gap-2">
                  <FormLabel className="text-[2.125rem] font-bold leading-[2.125rem] uppercase w-max">My goal</FormLabel>
                  <FormControl>
                    <Select value={field.value.toString()} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="p-0 underline leading-[2.125rem] uppercase border-none rounded-none shadow-none min-h-8 font-bold text-[2.125rem] text-primary">
                        <SelectValue placeholder="1 MONTH" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {targetsCompliance.map((el, i) => {
                            return (
                              <SelectItem key={i} value={el.value.toString()}>
                                {el.label}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button className="font-bold text-lg h-12" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
