class APIError {
    status: number;
    title: string;
    message: string;

    constructor(status: number, title: string, message: string) {
        this.status = status;
        this.title = title;
        this.message = message;

        // This is necessary to make the 'instanceof' operator work properly when extending built-in Error class in TypeScript
        Object.setPrototypeOf(this, APIError.prototype);
    }

    // Optional: A method to return the error object as a string, e.g. for logging purposes
    toString(): string {
        return `APIError: { status: ${this.status}, title: "${this.title}", message: "${this.message}" }`;
    }
}

export const getErrorMessage = err => {
    console.log(err)
    if (err.response) {
        console.log(
            'ERROR RESPONSE:',
            JSON.stringify(err.response.config.url, null, 2),
        );
        console.log('ERROR RESPONSE:', JSON.stringify(err.response.data, null, 2));
        const errorData = err.response.data;
        const errorStatus = errorData?.error?.code
        const errorTitle = errorData.error.title;
        const errorMessage = errorData.error.errors[0].message;

        const errorTitleFirstArray = errorData.error.errors?.length ? errorData.error.errors[0]?.title ?? errorData?.error?.title : errorData.error.title
        switch (errorStatus) {
            case 401:
                if(errorTitleFirstArray.toLowerCase() == "akun dinonaktifkan"){
                    throw new APIError(401, "Akun dinonaktifkan", "Sepertinya akun Anda berada sedang dinonaktifkan, Coba hubungi admin aplikasi untuk keterangan lebih lanjut.");
                }
                throw new APIError(errorStatus, "Sesi anda berakhir", 'Anda Tidak Memiliki Akses, Silahkan Login Ulang');
            case 422:
                if(errorTitleFirstArray.toLowerCase() == "akun dinonaktifkan"){
                    throw new APIError(401, "Akun dinonaktifkan", "Sepertinya akun Anda berada sedang dinonaktifkan, Coba hubungi admin aplikasi untuk keterangan lebih lanjut.");
                }
                switch (errorMessage){
                    case 'The email has already been taken.':
                        throw new APIError(errorStatus, errorTitle, 'Email yang anda gunakan telah terdaftar');
                    case 'The phone has already been taken.':
                        throw new APIError(errorStatus, errorTitle, 'Nomor Handphone yang anda gunakan telah terdaftar');
                    case 'Wrong password':
                        throw new APIError(errorStatus, errorTitle, 'Kata Sandi Lama Salah. Pastikan Kata Sandi Lama Anda Benar');
                    case 'Password anda salah':
                        throw new APIError(errorStatus, errorTitle, 'Kata Sandi Anda Salah');
                    case '':
                        throw new APIError(errorStatus, errorTitle, errorMessage);
                    default:
                        throw new APIError(errorStatus, errorTitle, errorMessage);
                }
            default:
                throw new APIError(errorStatus, errorTitle, errorMessage);

        }
    } else if (err.message === 'Network Error') {
        throw new Error('network_error');
    } else {
        throw new Error('internal_server_error');
    }
};