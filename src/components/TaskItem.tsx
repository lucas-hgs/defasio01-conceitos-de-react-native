import React, { useState, useRef, useEffect } from 'react';
import { 
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import crossIcon from '../assets/icons/edit/cross.png'
import penIcon from '../assets/icons/edit/pen.png'

import { EditTaskProps } from '../pages/Home';
import { Task } from './TasksList';

interface TaskItemProps {
  item: Task,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}: EditTaskProps) => void;
  index: number
}

export function TaskItem({ item, toggleTaskDone, removeTask, editTask, index }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTitle(item.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    editTask({ taskId: item.id, taskNewTitle: newTitle})
    setIsEditing(false)
  }

  useEffect(() => {
    if(textInputRef.current) {
      if(isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return(
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          >
          </TextInput>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {
          isEditing ?
            <TouchableOpacity 
              onPress={handleCancelEditing}
              style={{ marginTop: 5}}
            >
              <Image source={crossIcon}/>
            </TouchableOpacity>
          :
            <TouchableOpacity 
              onPress={handleStartEditing}
            >
              <Image source={penIcon}/>
            </TouchableOpacity>
        }
        <View style={{ width: 1, backgroundColor: "rgba(196, 196, 196, 0.24)", marginHorizontal: 12 }} />
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ marginRight: 20 }}
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
        >
          <Image 
            source={trashIcon} 
            style={isEditing ? {opacity: 0.2} : { opacity: 1}}
          />
        </TouchableOpacity>
      </View>        
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})