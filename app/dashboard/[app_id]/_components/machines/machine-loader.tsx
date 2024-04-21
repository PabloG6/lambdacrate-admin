"use server";

import { date } from "zod";
import { getMachines } from "../../_actions/machines";
import { ColumnDef } from "@tanstack/react-table";
import { MachineTable } from "./machines";

export async function MachineLoader({ app_id }: { app_id: string }) {
  const machines: any[] = await getMachines("some-app-id-somewhere");
  return (
    <>
      <MachineTable data={machines} />
    </>
  );
}
