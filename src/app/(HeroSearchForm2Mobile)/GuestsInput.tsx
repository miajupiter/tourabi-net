"use client";
import React, { useEffect, useState } from "react";
import NcInputNumber from "@/components/NcInputNumber";
import { FC } from "react";
import { GuestsObject } from "../tours/type";

export interface GuestsInputProps {
  defaultValue?: GuestsObject;
  onChange?: (data: GuestsObject) => void;
  className?: string;
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  className = "",
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    defaultValue?.guestAdults || 0
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
    defaultValue?.guestChildren || 0
  );
  const [guestBabyInputValue, setGuestBabyInputValue] = useState(
    defaultValue?.guestBaby || 0
  );

  useEffect(() => {
    setGuestAdultsInputValue(defaultValue?.guestAdults || 0);
  }, [defaultValue?.guestAdults]);
  useEffect(() => {
    setGuestChildrenInputValue(defaultValue?.guestChildren || 0);
  }, [defaultValue?.guestChildren]);
  useEffect(() => {
    setGuestBabyInputValue(defaultValue?.guestBaby || 0);
  }, [defaultValue?.guestBaby]);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestBaby: guestBabyInputValue,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestBaby") {
      setGuestBabyInputValue(value);
      newValue.guestBaby = value;
    }
    onChange && onChange(newValue);
  };

  return (
    <div className={`flex flex-col relative p-5 ${className}`}>
      <span className="mb-5 block font-semibold text-xl sm:text-2xl">
        {`Who's coming?`}
      </span>
      <NcInputNumber
        className="w-full"
        defaultValue={guestAdultsInputValue}
        onChange={(value) => handleChangeData(value, "guestAdults")}
        max={100}
        label="Adults"
        desc="Ages 13 or above"
      />
      <NcInputNumber
        className="w-full mt-6"
        defaultValue={guestChildrenInputValue}
        onChange={(value) => handleChangeData(value, "guestChildren")}
        max={100}
        label="Children"
        desc="Ages 2-12"
      />

      <NcInputNumber
        className="w-full mt-6"
        defaultValue={guestBabyInputValue}
        onChange={(value) => handleChangeData(value, "guestBaby")}
        max={100}
        label="Baby"
        desc="Ages 0-2"
      />
    </div>
  );
};

export default GuestsInput;
