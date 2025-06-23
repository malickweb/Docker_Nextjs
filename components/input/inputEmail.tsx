import { useState } from 'react';

export function InputEmail() {
    const [email, setEmail] = useState();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    };
    return (
        <div>
            <input onChange={handleInputChange} type="email" name="email" />
        </div>
    );
}
