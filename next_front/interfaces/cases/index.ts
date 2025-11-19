type states = "abierto" | "en_progreso" | "cerrado"

export interface Case {
    id: number;
    nombre: string;
    descripcion: string;
    estado: states;
}


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CaseCreateRequest extends Omit<Case, 'id'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CaseUpdateRequest extends Partial<CaseCreateRequest> {}