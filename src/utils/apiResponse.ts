
// Interface para la respuesta de la API
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

// Respuesta casos con exito
export const successResponse = <T>(
    data: T,
    message = "Operacion exitosa"
): ApiResponse<T> => ({
    success: true,
    message,
    data
});

// Respuesta casos de Error
export const errorResponse = (
    message: string,
    error?: unknown
): ApiResponse<null> => ({
    success: false,
    message,
    error: error instanceof Error ? error.message : undefined
});

