import React, { Component } from 'react';

// import styles
import styles from '../stories.css';

var skus = [];
class DragDrog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ tasks: nextProps.itemList });
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData("text/plain", id);
    }

    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("text"),
            tasks = this.state.tasks.filter((task) => {
                if (task.name == id) {
                    task.arrangeCategory = cat;
                    if (cat === 'arrangedItemList') {
                        skus.push(task.sku);
                    } else {
                        skus = skus.filter(i => i !== task.sku);
                    }
                }
                return task;
            });
        this.setState({ ...this.state, tasks });
        this.props.updatedSkuList(skus);
    }

    render() {
        var tasks = {
            originalItemList: [],
            arrangedItemList: []
        }
        this.state.tasks.length != 0 && this.state.tasks.forEach((t, idx) => {
            if (t.arrangeCategory == 'arrangedItemList') {
                tasks['arrangedItemList'].push(
                    <div key={t.idx}
                        onDragStart={(e) => this.onDragStart(e, t.name)}
                        draggable
                        className={styles.listItem}>
                        {<img className={styles.itemImages} alt='No Image available' src={t.image1 || t.image2 || t.image3 || t.image4} />}<div className={styles.liText}>{t.name}</div>
                    </div>
                );
            } else {
                tasks['originalItemList'].push(
                    <div key={t.idx}
                        onDragStart={(e) => this.onDragStart(e, t.name)}
                        draggable
                        className={styles.listItem}>
                        {<img className={styles.itemImages} alt='No Image available' src={t.image1 || t.image2 || t.image3 || t.image4} />}<div className={styles.liText}>{t.name}</div>
                    </div>
                );
            }
        });
        return (
            <div className={styles.dragContainer}>
                <div className={styles.inProgress} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => { this.onDrop(e, "originalItemList") }}>
                    <span className={styles.taskHeader}>Item List</span>
                    {tasks.originalItemList}
                </div>
                <div className={styles.droppable} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, "arrangedItemList")}>
                    <span className={styles.taskHeader}>Arranged Item List</span>
                    {tasks.arrangedItemList}
                </div>
            </div>
        );
    }
}
export default DragDrog;