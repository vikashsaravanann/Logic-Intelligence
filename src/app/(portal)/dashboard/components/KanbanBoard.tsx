'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const initialColumns = {
  new: {
    name: 'New Leads',
    items: [],
  },
  contacted: {
    name: 'Contacted',
    items: [],
  },
  negotiating: {
    name: 'Negotiating',
    items: [],
  },
  closed: {
    name: 'Closed',
    items: [],
  },
};

export default function KanbanBoard({ leads = [] }: { leads: any[] }) {
  const [columns, setColumns] = useState(initialColumns);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Populate the 'new' column with actual leads on load if it's empty initially
    if (leads.length > 0) {
      setColumns((prev) => ({
        ...prev,
        new: {
          ...prev.new,
          items: leads.map(l => ({ ...l, id: l.id.toString() })) as never[],
        },
      }));
    }
  }, [leads]);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  if (!isClient) {
    return <div className="h-96 w-full flex items-center justify-center text-zinc-500">Loading pipeline...</div>;
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 h-full min-h-[400px]">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="flex flex-col min-w-[280px] flex-1 bg-white/[0.01] border border-white/5 rounded-2xl p-4" key={columnId}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-zinc-300 text-sm flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    columnId === 'new' ? 'bg-blue-400' :
                    columnId === 'contacted' ? 'bg-amber-400' :
                    columnId === 'negotiating' ? 'bg-purple-400' :
                    'bg-emerald-400'
                  }`} />
                  {column.name}
                </h2>
                <span className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-zinc-500 font-bold">
                  {column.items.length}
                </span>
              </div>
              
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 rounded-xl transition-colors min-h-[100px] ${
                        snapshot.isDraggingOver ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-transparent'
                      }`}
                    >
                      {column.items.map((item: any, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`mb-3 p-4 rounded-xl shadow-lg border transition-colors ${
                                    snapshot.isDragging ? 'bg-[#0f172a] border-indigo-500/50 scale-105 z-50' : 'bg-[#0a0f1c] border-white/10 hover:border-white/20'
                                  }`}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm text-white">{item.name}</h4>
                                  </div>
                                  <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{item.message || item.company || 'No additional details'}</p>
                                  
                                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                                    <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {item.created_at ? new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Today'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <button className="p-1.5 rounded bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors">
                                        <Mail className="w-3 h-3" />
                                      </button>
                                      <button className="p-1.5 rounded bg-white/5 text-zinc-400 hover:bg-white/10 transition-colors">
                                        <Phone className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
