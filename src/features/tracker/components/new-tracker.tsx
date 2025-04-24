"use client";

import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AutoWidthInput } from "@/components/custom-input";

import { createTrackerSchema, weekDays, targetsCompliance } from "../schemas";
import { useTrackerStore } from "@/store/useTrackerStore";
import { Separator } from "@/components/ui/separator";

type formSchema = z.infer<typeof createTrackerSchema>;

export const NewTracker = () => {
  const router = useRouter();
  const { addTracker } = useTrackerStore();

  const form = useForm<formSchema>({
    resolver: zodResolver(createTrackerSchema),
    defaultValues: {
      id: new Date().getTime().toString(),
      description: "",
      repeat: 1,
      weekday: [0, 1, 2, 3, 4, 5, 6],
      target: targetsCompliance[0].value,
      createdAt: new Date().toISOString(),
      completedDays: {},
    },
  });

  const onSubmit = (values: formSchema) => {
    addTracker({
      ...values,
      target: Number(values.target),
      createdAt: new Date(values.createdAt).toISOString(),
      completedDays: {},
    });
    router.push("/trackers-calendar");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-4 h-full"
      >
        <Image
          priority
          className="mx-auto"
          src="/images/duck-stay.png"
          width={256}
          height={256}
          alt="duck-stay"
        />
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-0 gap-0 mb-2">
                <FormLabel className="text-[2.125rem] font-bold leading-[2.125rem] uppercase">
                  I want
                </FormLabel>
                <FormControl>
                  <AutoWidthInput
                    className="bg-transparent!"
                    disabledWidth={true}
                    placeholder="TO DO SOMETHING"
                    {...field}
                  />
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
                      className="w-[2.5ch] bg-transparent!"
                      placeholder="12"
                      disabledWidth={true}
                      type="number"
                      inputMode="decimal"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormLabel className="text-[2.125rem] font-bold leading-[2.125rem] uppercase w-full">
                    Per day
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weekday"
            render={({ field }) => {
              const value = field.value ?? []; // гарантируем массив
              return (
                <FormItem>
                  <div className="flex flex-wrap gap-2 justify-between my-8 px-2.5">
                    {weekDays.map((day) => {
                      const isChecked = value.includes(day.value);
                      const toggle = () => {
                        const newValue = isChecked
                          ? value.filter((v) => v !== day.value)
                          : [...value, day.value];
                        field.onChange(newValue);
                      };
                      return (
                        <div
                          key={day.label}
                          className="flex flex-col items-center gap-1 cursor-pointer"
                        >
                          <p className="text-sm font-medium">{day.label}</p>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={toggle}
                            className="rounded-full  dark:bg-transparent! dark:border-primary!"
                          />
                        </div>
                      );
                    })}
                  </div>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-wrap gap-2">
                  <FormLabel className="text-[2.125rem] font-bold leading-[2.125rem] uppercase w-max">
                    My goal
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="p-0 bg-transparent! underline leading-[2.125rem] uppercase border-none rounded-none shadow-none min-h-8 font-bold text-[2.125rem] text-primary">
                        <SelectValue placeholder="1 MONTH" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {targetsCompliance.map((el, i, a) => {
                            return (
                              <>
                                <SelectItem key={el.value} value={el.value.toString()}>
                                  {el.label}
                                </SelectItem>
                                {i !== a.length - 1 && <Separator />}
                              </>
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
          Add a habbit
        </Button>
      </form>
    </Form>
  );
};
