import React from 'react';
import Dropzone from 'react-dropzone';

// Import Style
import styles from './inventory.css';

class DropzoneComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageFiles: [],
            previewFile: []
        }
    }

    handleShopOnDrop(acceptedFiles, rejectedFiles) {
        const me = this,
            { imageFiles, previewFile } = me.state,
            { title } = me.props;
        acceptedFiles.forEach(file => {
            previewFile.push(file);
            me.setState({ imageFiles: [], previewFile: previewFile });
            let fileType = file.type.match(/^image/) ? 'image' : file.type.match(/^video/) ? 'video' : '';
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileAsArrayBuffer = reader.result;
                console.log(fileAsArrayBuffer);
                let blobData = new Blob([fileAsArrayBuffer], { type: `${file.type}` });
                if (fileType != '') {
                    imageFiles.push(blobData);
                    me.setState({ imageFiles: imageFiles, fileType: fileType });
                    me.props.handleUpload(title.toLowerCase().replace(/\s/g, ''), imageFiles, fileType);
                }
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.readAsArrayBuffer(file);
        });
    }

    render() {
        const { previewFile } = this.state,
            { title, type } = this.props;
        return (
            <div className={styles.productDetailField}>
                <h4>{title}:</h4>
                <div style={{ display: 'inline-block' }}>
                    <div className={styles.fileUpload}>
                        <Dropzone onDrop={this.handleShopOnDrop.bind(this)} accept={`${type}/*`} multiple={false}>
                            <p>{`Select product ${title} to upload`}</p>
                        </Dropzone>
                    </div>
                    {previewFile.length > 0 ? <div>
                        <div>{previewFile.map((file) => {
                            if (file.type.match(/^image/)) {
                                return <img className={styles.productDetailImg} src={file.preview} />
                            }
                            if (file.type.match(/^video/)) {
                                return <video className={styles.productDetailVideo} src={file.preview} controls />
                            }
                        })}</div>
                    </div> : null}
                </div>
            </div>
        );
    }
}

export default DropzoneComp;