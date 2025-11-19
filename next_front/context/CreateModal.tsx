import { Dialog } from '@headlessui/react';

const CreateCaseModal = ({ isOpen, setIsOpen }) => (
  <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
    <Dialog.Title>Crear ítem</Dialog.Title>
    <form>
      <input type="text" placeholder="Nombre del ítem" />
      <button type="submit">Crear</button>
    </form>
  </Dialog>
);
