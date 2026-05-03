import { useState } from "react";

export const BottomDrawer = () => {
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  return (
    <div>
      <div className="max-h-[40vh] overflow-y-auto px-4 pb-4"></div>
    </div>
  );
};
