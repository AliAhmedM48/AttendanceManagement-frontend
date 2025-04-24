import React from "react";
import { Dialog } from "@headlessui/react";

function InvalidTokenModal({ open, onLogout }) {
  return (
    <Dialog open={open} onClose={onLogout} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm bg-white p-6 rounded-xl shadow-xl text-center">
          <Dialog.Title className="text-xl font-semibold text-red-600">
            Session Expired
          </Dialog.Title>
          <Dialog.Description className="my-4 text-sm text-gray-600">
            Your session is no longer valid. Please sign in again.
          </Dialog.Description>

          <button
            onClick={onLogout}
            className="mt-4 w-full bg-[#1e165c] hover:scale-105 transition-transform text-white py-2 rounded-md cursor-pointer"
          >
            Sign In Again
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default InvalidTokenModal;
