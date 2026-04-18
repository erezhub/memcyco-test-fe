import {TaskParameter} from "../../types/task";

interface ParameterInputsProps {
    parameters: TaskParameter[];
    values: Record<string, string | number>;
    onChange: (value: { [p: number]: string }) => void;
}

export default function ParameterInputs({
                                            parameters,
                                            values,
                                            onChange
                                        }: ParameterInputsProps) {
    const handleChange = (name: any, value: string) => {
        onChange({ ...values, [name]: value });
    };


    return (
        <div>
            {parameters.map((p) => (
                <div key={p.name}>
                    <label>
                        {p.name} {p.required && "*"}
                    </label>

                    <input
                        type="text"
                        value={values[p.name] || ""}
                        required={p.required}
                        onChange={(e) => handleChange(p.name, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}
