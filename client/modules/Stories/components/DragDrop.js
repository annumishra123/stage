import React, { Component } from 'react';

// import styles
import styles from '../stories.css';

var skus = [];
class DragDrog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            originalItemList: [],
            arrangedItemList: []
        }
    }

    componentDidMount() {
        this.setState({ tasks: this.props.itemList });
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.itemList != nextProps.itemList) && nextProps.isAfterChange) {
            this.setState({ tasks: nextProps.itemList });
        }
    }

    onDragStart = (ev, item) => {
        console.log('dragstart:', item);
        ev.dataTransfer.setData("text/plain", item);
    }

    onDrop = (ev, cat, position, inList) => {
        const { originalItemList, arrangedItemList, tasks } = this.state;
        let item = ev.dataTransfer.getData("text"); // dragged item
        tasks.forEach(task => {
            if (task.name == item) {
                task.arrangeCategory = cat;
                if (cat === 'arrangedItemList') {
                    if (arrangedItemList.some(el => el.name === item) && inList) {
                        skus = [];
                        let dragItemIndex = arrangedItemList.findIndex(p => p.name == item),
                            tempObj = arrangedItemList[position];
                        arrangedItemList[position] = arrangedItemList[dragItemIndex];
                        arrangedItemList[dragItemIndex] = tempObj;
                        console.log(arrangedItemList);
                        arrangedItemList.forEach(i => skus.push(i.sku));
                    } else if (!skus.includes(task.sku)) {
                        skus.push(task.sku);
                        arrangedItemList.push(task);
                    }
                    this.setState({
                        arrangedItemList: arrangedItemList,
                        originalItemList: tasks.filter(i => i.arrangeCategory != 'arrangedItemList')
                    });
                }
                else {
                    let dataList = originalItemList.length != 0 ? originalItemList : tasks.filter(i => i.arrangeCategory != 'arrangedItemList'),
                        isExist = dataList.some(el => el.name === item);
                    if (isExist && inList) {
                        let dragItemIndex = dataList.findIndex(p => p.name == item),
                            tempObj = dataList[position];
                        dataList[position] = dataList[dragItemIndex];
                        dataList[dragItemIndex] = tempObj;
                        console.log(dataList);
                    } else if (!isExist) {
                        dataList.push(task);
                        skus = skus.filter(f => f != task.sku);
                    }
                    this.setState({
                        arrangedItemList: tasks.filter(i => i.arrangeCategory == 'arrangedItemList'),
                        originalItemList: dataList
                    });
                }
            }
        });
        this.props.updatedSkuList(skus);
    }

    render() {
        const { originalItemList, arrangedItemList, tasks } = this.state;
        let arrangedList = arrangedItemList.length != 0 ? arrangedItemList : [];
        let originalList = originalItemList.length != 0 ? originalItemList : tasks || [];
        return (
            <div className={styles.dragContainer}>
                <div className={styles.inProgress} onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.onDrop(e, "originalItemList")}>
                    <span className={styles.taskHeader}>Item List</span>
                    <div className={styles.content}>
                        {originalList.map((item, idx) => <div key={idx}
                            onDragStart={(e) => this.onDragStart(e, item.name)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => this.onDrop(e, "originalItemList", idx, true)}
                            draggable
                            className={styles.listItem}>
                            {<img className={styles.itemImages} alt='No Image available' src={item.image1 || item.image2 || item.image3 || item.image4} />}<div className={styles.liText}>{item.name}</div>
                        </div>)}
                    </div>
                </div>
                <div className={styles.droppable} onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.onDrop(e, "arrangedItemList")}>
                    <span className={styles.taskHeader}>Arranged Item List</span>
                    <div className={styles.content}>
                        {arrangedList.map((item, idx) => <div key={idx}
                            onDragStart={(e) => this.onDragStart(e, item.name)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => this.onDrop(e, "arrangedItemList", idx, true)}
                            draggable
                            className={styles.listItem}>
                            {<img className={styles.itemImages} alt='No Image available' src={item.image1 || item.image2 || item.image3 || item.image4} />}<div className={styles.liText}>{item.name}</div>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}
export default DragDrog;