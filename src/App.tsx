import React, { ChangeEvent, useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import Footer from './components/Footer';

import TitlesList from "./components/List/TitlesList";
import NewTitle from "./components/Inputs/NewTitle";
import ErrorModal from "./components/Inputs/ErrorModal";
import Search from "./components/Inputs/Search";
import SortList from "./components/List/SortList";

import { ITitle } from "./Interfaces";
import { IError } from "./Interfaces";

import TitlesJSON from "./data.json";


const App: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<IError | null>(null);
  const [titlesList, setTitlesList] = useState<ITitle[]>(TitlesJSON.titles);
  const [searchList, setSearchList] = useState<ITitle[]>(titlesList);
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<string>("ASC");


  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setTitle(event.target.value);
  };

  const addTitle = (event: ChangeEvent<EventInit>): void => {
    event.preventDefault();
    if (title.trim().length === 0) {
      setIsValid(false);
      return;
    }
    
    const newTitle = { id: Math.floor(Math.random() * 1000), name: title };
    const isDuplicate = titlesList.find(
      item => item.name.toLowerCase().replace(/\s/g, '') === title.toLowerCase().replace(/\s/g, '')
    );
    if (!isDuplicate) {
      setTitlesList([...titlesList, newTitle]);
      setOrder('ASC');
    } else {
      setError({
        title: 'Whoops! 🎬',
        message: `Seems like ${title} is already in the list. Try with another masterpiece.`
      });
      return;
    }
    setTitle(""); 
  }

    const errorHandler = (): void => {
      setError(null);
    };


  const deleteTitle = (movieNameToDelete: string): void => {
    setTitlesList(
      titlesList.filter((title) => {
        return title.name !== movieNameToDelete;
      })
    );
  }


  const handleFilter = (event: ChangeEvent<HTMLInputElement>): ITitle[] => {
    const searchWord = event.target.value;
    setSearch(searchWord);
    if (!searchWord) {
      setSearchList(titlesList);
    } else {
      setSearchList(
        titlesList.filter((title) => {
          return title.name.toLowerCase().includes(searchWord.toLowerCase());
        })
      );
    }
    return searchList;
  };

    useEffect(() => {
      if (!search) {
        setSearchList(titlesList);
      } else {
        setSearchList(
          titlesList.filter((title) => {
            return title.name.toLowerCase().includes(search.toLowerCase());
          })
        );
      }
    }, [search, titlesList]);

    const clearSearch = (): void => {
      setSearch("");
    }

    
  const sorting = (): void  => {
    if (order === 'ASC') {
      const sortedList = [...titlesList].sort((a: ITitle, b: ITitle) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        setTitlesList(sortedList);
        setOrder("DSC");
    } else {
      const sortedList = [...titlesList].sort((a: ITitle, b: ITitle) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        );   
        setTitlesList(sortedList);
        setOrder("ASC");
      }
    }


  return (
    <div className="App">
      <Header />
      
      <div className="container">
        <div className="input-container">
          <Search 
            searchedTitle={search} 
            onSearch={handleFilter} 
            clearSearch={clearSearch}
          />
          <NewTitle
            movieTitle={title}
            addTitle={addTitle}
            handleChange={handleChange}
            validation={isValid}
          />
        </div>

          {error && (
            <ErrorModal
              errorTitle={error.title}
              errorMessage={error.message}
              onConfirm={errorHandler}
            />
          )}

        <div className="titles-list">
          <SortList 
            sorting={sorting} 
          />
          <TitlesList 
            items={searchList} 
            deleteTitle={deleteTitle}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;