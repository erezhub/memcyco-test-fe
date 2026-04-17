import {TaskParameter} from "../../types/task";

interface ParameterInputsProps {
    parameters: TaskParameter[];
    values: {};
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

    // @ts-ignore
    return (
        <div>
            {parameters.map((p: TaskParameter) => (
                <div key={p.name}>
                    <label>{p.name}</label>
                    <input
                        type={p.type === "number" ? "number" : "text"}
                        required={p.required}
                        value={values[p.name] || ""}
                        onChange={(e) => handleChange(p.name, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}
