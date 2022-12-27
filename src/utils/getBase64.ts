

export const getBase64 = (file: any) => {
    return new Promise((resolve: any, rejects: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => rejects(error);
    })
}