"use client";

import Image from "next/image";
import { useState } from "react";

import { splitText } from "@/lib/split-text";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

import { questions } from "../moki";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Quiz = () => {
  const router = useRouter();

  const [start, setStart] = useState<boolean>(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (option: number) => {
    if (selected) return;

    setSelected(option);
    setAnswers((prev) => [...prev, option]);

    setTimeout(() => {
      setSelected(null);

      const nextStep = currentStep + 1;

      if (nextStep >= questions.length) {
        onSubmitAnwers([...answers, option]);
      } else {
        setCurrentStep(nextStep);
      }
    }, 1000);
  };

  const onSubmitAnwers = (finalAnswers: number[]) => {
    console.log(finalAnswers);
    router.push("/new-tracker");
  };

  if (!start) {
    return (
      <div className="flex flex-col justify-between gap-4 h-full">
        <div className="space-y-5">
          <h1 className="text-[2.625rem] font-bold uppercase leading-[52px]">
            Are you ready <br />
            to start
            <br />
            <span className="text-primary">
              working
              <br />
              on yourself<span className="text-black">?</span>
            </span>
          </h1>

          <Image
            className="mx-auto"
            src="/images/duck-champion.png"
            width={200}
            height={200}
            alt="duck-champion"
          />
        </div>

        <Button
          onClick={() => setStart(true)}
          className="font-bold text-lg h-12"
        >
          Let&apos;s Go!
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between gap-4 h-full">
      <div className="space-y-4">
        <Image
          className="mx-auto"
          src="/images/duck-mapping.png"
          width={200}
          height={200}
          alt="duck-mapping"
        />
        <h2 className="text-3xl font-semibold text-center">
          {splitText(questions[currentStep].question)}
        </h2>
      </div>

      <div className="space-y-8">
        <ul className="space-y-3.5">
          {questions[currentStep].options.map((option, i) => {
            const id = i + 1;
            return (
              <li
                key={i}
                onClick={() => handleSelect(id)}
                className="flex items-center gap-2.5 p-2.5 cursor-pointer"
              >
                <Checkbox checked={selected === id} />
                {option}
              </li>
            );
          })}
        </ul>

        <div className="flex gap-2">
          {questions.map((_, i) => (
            <Progress key={i} value={i <= currentStep ? 100 : 0} />
          ))}
        </div>
      </div>
    </div>
  );
};
