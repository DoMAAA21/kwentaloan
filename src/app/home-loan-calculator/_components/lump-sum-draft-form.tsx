"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  parseAmountInput,
  validateLumpSumAmount,
} from "@/lib/mortgage/parse-amount";
import { cn } from "@/lib/utils";
import {
  calculatorFieldClassName,
  calculatorLabelClassName,
} from "./field-styles";

const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export type LumpSumDraftValues = {
  month: string;
  year: string;
  amount: string;
};

type LumpSumDraftFormProps = {
  defaultMonth: string;
  defaultYear: string;
  onAdd: (entry: { month: number; year: number; amount: number }) => void;
};

export function LumpSumDraftForm({
  defaultMonth,
  defaultYear,
  onAdd,
}: LumpSumDraftFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LumpSumDraftValues>({
    defaultValues: {
      month: defaultMonth,
      year: defaultYear,
      amount: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  function onSubmit(values: LumpSumDraftValues) {
    const amount = parseAmountInput(values.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }
    onAdd({
      month: Number(values.month),
      year: Number(values.year),
      amount,
    });
    reset({
      month: values.month,
      year: values.year,
      amount: "",
    });
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <p className="text-base text-muted-foreground">
        Add one lump sum at a time, then tap{" "}
        <strong className="font-medium text-foreground">Add lump sum</strong>{" "}
        again for another date.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="extra-month" className={calculatorLabelClassName}>
            Month
          </Label>
          <select
            id="extra-month"
            className={cn(
              calculatorFieldClassName,
              "w-full rounded-lg border border-input bg-transparent px-2.5",
            )}
            {...register("month")}
          >
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="extra-year" className={calculatorLabelClassName}>
            Year
          </Label>
          <Controller
            name="year"
            control={control}
            rules={{
              validate: (value) => {
                const year = Number(value);
                if (!Number.isFinite(year) || year < 2000 || year > 2100) {
                  return "Enter a valid year (2000–2100).";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <Input
                id="extra-year"
                inputMode="numeric"
                className={calculatorFieldClassName}
                aria-invalid={Boolean(errors.year)}
                {...field}
              />
            )}
          />
          {errors.year ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.year.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="extra-amount" className={calculatorLabelClassName}>
            Lump sum amount (₱)
          </Label>
          <Controller
            name="amount"
            control={control}
            rules={{
              validate: (value) => validateLumpSumAmount(value),
            }}
            render={({ field }) => (
              <Input
                id="extra-amount"
                inputMode="decimal"
                placeholder="0"
                className={calculatorFieldClassName}
                aria-invalid={Boolean(errors.amount)}
                {...field}
              />
            )}
          />
          {errors.amount ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.amount.message}
            </p>
          ) : null}
        </div>
      </div>
      <Button type="submit" variant="outline">
        Add lump sum
      </Button>
    </form>
  );
}
