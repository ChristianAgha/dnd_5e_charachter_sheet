import axios from 'axios';

export const get_classes = () => {
    axios.get('/classes/')
    .then((response) => {
        return response.data
    });
};
