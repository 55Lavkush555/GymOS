"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function ConfirmDialog({
  children,
  title,
  description,
  onConfirm,
}) {
  return (
    <AlertDialog.Root>

      <AlertDialog.Trigger asChild>
        {children}
      </AlertDialog.Trigger>


      <AlertDialog.Portal>

        <AlertDialog.Overlay
          className="fixed inset-0 bg-black/50"
        />


        <AlertDialog.Content
          className="fixed top-1/2 left-1/2 
          w-[90%] max-w-md 
          -translate-x-1/2 -translate-y-1/2
          rounded-xl bg-[var(--card)] p-6"
        >

          <AlertDialog.Title className="text-lg font-semibold">
            {title}
          </AlertDialog.Title>


          <AlertDialog.Description className="mt-2 text-gray-500">
            {description}
          </AlertDialog.Description>


          <div className="mt-5 flex justify-end gap-3">


            <AlertDialog.Cancel
              className="px-4 py-2 rounded-lg border border-[var(--border)]"
            >
              Cancel
            </AlertDialog.Cancel>


            <AlertDialog.Action
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500 text-white"
            >
              Delete
            </AlertDialog.Action>


          </div>


        </AlertDialog.Content>

      </AlertDialog.Portal>

    </AlertDialog.Root>
  );
}