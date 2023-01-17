import { ErrorMessage } from "@hookform/error-message";
import "./index.css";

function InputError({ name, errors }) {
    return (
        <ErrorMessage
            errors={errors}
            name={name}
            render={({ messages }) => {
                return messages
                    ? Object.entries(messages).map(([type, message]) => (
                          <p key={type} className='error-message'>
                              {message}
                          </p>
                      ))
                    : null;
            }}
        />
    );
}

export default InputError;
