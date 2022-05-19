const InputString = (props) => {
    return (
        
        <div className="form-input-div" key={props.fieldKey}>
            <label htmlFor={"field-" + props.fieldKey} className="input-label">
                {props.title}
            </label>
            <input
                type={"text"}
                id={"field-" + props.fieldKey}
                className="form-input"
                defaultValue={String(props.value) || String(props.default_value)}
                required={props.mandatory}
                placeholder="Text input"
                onChange={props.onChange}
            />
        </div>
    );
};

InputString.defaultProps = {
    fieldKey:'',
    title:'',
    mandatory:'',
    value:'',
    default_value:'',
    onChange: () => {},
}

export default InputString