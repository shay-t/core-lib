import React from 'react'

const InputCheckbox = (props) => {

    return (
        <div className="form-input-div">
            <label className="input-label">{props.title}</label>
            <div key={props.fieldKey}>
                    <input
                        type='checkbox'
                        id={props.value + props.fieldKey}
                        name={"list" + props.fieldKey}
                        value={props.value}
                        defaultChecked={
                            props.value || props.default_value
                        }
                        onChange={props.onChange}
                    />
                </div>
        </div>
    );
};

InputCheckbox.defaultProps = {
    fieldKey:'',
    title:'',
    mandatory:false,
    value:'',
    default_value:'',
    onChange: () => {},
}

export default InputCheckbox