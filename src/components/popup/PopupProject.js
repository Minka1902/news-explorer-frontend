import * as React from 'react';
import CurrentProjectContext from '../../contexts/CurrentProjectContext';
import { useHistory } from 'react-router-dom';

export default function PopupProject(props) {
    const { isOpen, onClose } = props;
    const { currentProject } = React.useContext(CurrentProjectContext);
    const history = useHistory();

    const closeButton = () => {
        onClose({ isProject: true });
    };

    const onProjectClick = (element) => {
        if (element.classList.contains('popup__image-container')) {
            history.push(`/project`);
            onClose({ isProject: true });
            return true;
        }
        return onProjectClick(element.parentElement);
    };

    return (
        <div className={`popup popup_type_project ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__image-container" onClick={(evt) => onProjectClick(evt.target)}>
                <button className="popup__close-button" type="button" aria-label="close" onClick={closeButton}></button>
                <h2 className="popup__title_project">{currentProject ? currentProject.name : ""}</h2>
                <img className="popup__image" src={currentProject ? currentProject.imageUrl : "#"} alt={currentProject ? currentProject.name : ""} />
                <h2 className="popup__text">{currentProject ? currentProject.description : ""}</h2>
            </div>
        </div>
    );
};
