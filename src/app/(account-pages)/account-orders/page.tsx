import React from "react"
import ButtonPrimary from "@/shared/ButtonPrimary"

const AccountOrders = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">My Orders</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="max-w-2xl">
        <span className="text-xl font-semibold block">order list</span>
        <br />
        <span className="text-neutral-700 dark:text-neutral-300 block">
          {`Irure adipisicing Lorem qui quis tempor laborum ullamco tempor nulla ut cillum. 
          Labore anim proident eu consequat excepteur irure ad ullamco qui enim in est culpa consequat.
          Nisi mollit nostrud irure officia pariatur id est proident eu.`}
          <br />
          <br />
          Minim non esse ad cupidatat. Irure est occaecat labore incididunt sunt tempor in aute occaecat do voluptate culpa sunt eiusmod.
          Adipisicing tempor eiusmod labore officia anim nulla cillum ipsum et adipisicing incididunt aliqua sit.
          Pariatur voluptate labore irure pariatur do ea voluptate dolore dolore elit minim aliquip proident.
          Lorem laborum ea in consequat minim mollit id officia eu et. Aute labore in id ullamco id aliqua nulla labore.
          Duis labore irure labore enim sint adipisicing eu excepteur.
        </span>
        <div className="pt-10">
          <ButtonPrimary>Add payout method</ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export default AccountOrders
