import React from "react";
import { useErr } from "../../contexts/GlobalContext";

const Err = () => {
	const err = useErr();

	return (
		<div className="errOverlay flex justify-center flex-col">
			<p className="text-red-500 font-bold">An Error has Occured...</p>
			<p className="text-red-200">Error Message: {err.msg}</p>
			{err.solution && <p>{err.solution}</p>}
		</div>
	);
};

export default Err;
