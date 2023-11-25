import { create } from "@/app/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import React from "react";

export default async function OrganizationIdPage() {
  const boards = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-4">
      <form action={create}>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
        />
        <Button>Submit</Button>
      </form>
      <div className="space-y-2">
        {boards.map((board) => (
          <div key={board.id}>{board.title}</div>
        ))}
      </div>
    </div>
  );
}
