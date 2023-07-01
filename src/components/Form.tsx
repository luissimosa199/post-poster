import { useForm } from 'react-hook-form';
import { type FunctionComponent, type Dispatch, type SetStateAction } from 'react';
import { type ResponseData } from '@/types/responseData'

type FormInputs = {
    name: string
    url: string
}

type FormProps = {
    setApiResponse: Dispatch<SetStateAction<ResponseData | null>>
}

const Form: FunctionComponent<FormProps> = ({ setApiResponse }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

    const submitData = async (data: FormInputs) => {
        try {
            const response = await fetch(`/api/${data.name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                const responseData = await response.json();

                reset()
                setApiResponse(responseData);
            } else {
                throw new Error('Request failed');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = (data: FormInputs) => {
        submitData(data)

    }

    return (
        <div className="flex flex-col items-center mt-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-lg w-full bg-white border border-gray-300 shadow-sm rounded-md p-4 md:w-96"
            >
                <label htmlFor="option" className="block mb-2">
                    Selecciona el blog:
                </label>
                <select
                    id="name"
                    {...register("name", { required: 'Ingresa el nombre de blog' })}
                    className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none"
                >
                    <option value="">Seleccionar</option>
                    <option value="doxadoctor">Doxadoctor</option>
                    <option value="swartz-track">Swartz Track</option>
                    <option value="option3">Option 3</option>
                </select>
                {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                )}

                <label htmlFor="text" className="block mb-2">
                    Ingresa la URL de la publicación:
                </label>
                <input
                    type="text"
                    id="url"
                    {...register("url", { required: 'Ingresa la URL de la publicación' })}
                    className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none"
                />
                {errors.url && (
                    <p className="text-red-500 mb-2">{errors.url.message}</p>
                )}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};


export default Form;