import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CollapseExpand from "../collapseExpand/CollapseExpand";
import "./TreeSection.scss";

const TreeSection = (props) => {
	const [collapse, setCollapse] = useState(false);

	const items = [];
	for (const item of props.items) {
        items.push(
            <div
                key={item.name}
                onClick={props.onClick.bind(this, item)}
                className={"node-child"}
            >
                {item.name}
            </div>
        );
	}

 	return (
		<div className={["tree-section"]}>
            <div className={["node-title"]} onClick={() => {setCollapse(!collapse)}}> {props.title} </div>
            <CollapseExpand collapsed={collapse}>{items}</CollapseExpand>
		</div>
	);
};

TreeSection.defaultProps = {
	title: "",
	items: [],
	onClick: (item, e) => {}, //Fire the path
};

export default TreeSection;
