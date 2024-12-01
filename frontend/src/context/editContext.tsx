import { createContext, ReactNode, useContext, useState } from "react";

type Edittype = {
  editing: string | null;
  handleEdit: (arg0: string | null) => void;
};

const EditContext = createContext<Edittype | undefined>(undefined);

const EditProvider = ({ children }: { children: ReactNode }) => {
  const [editing, setEdit] = useState<string | null>(null);

  function handleEdit(edit: string | null) {
    setEdit(edit);
  }
  return (
    <EditContext.Provider value={{ handleEdit, editing }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditing = () => {
    const context = useContext(EditContext);
    if (context === undefined) {
      throw new Error("useEditing must be used within an Edit Provider");
    }
    return context;
  };
  
export default EditProvider;
