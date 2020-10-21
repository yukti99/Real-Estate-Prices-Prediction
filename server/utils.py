import numpy as np
import json
import pickle

__model = None
__locations = None
__data_columns = None


def get_predicted_price(location,sqft,size_bhk,bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    # inputs from user for prediction
    x[0] = sqft
    x[1] = bath
    x[2] = size_bhk
    if (loc_index >= 0):
        x[loc_index] = 1
    # return the predicted price upto two digits precision
    return round(__model.predict([x])[0],2)

def get_house_locations():
    return __locations

def get_data_columns():
    return __data_columns

def load_model_artifacts():
    print("Loading Model Artifacts...")
    global __data_columns
    global __locations
    with open("./artifacts/columns.json","r") as f:
        __data_columns  = json.load(f)['data_columns']
        # starting location of location names is 3
        __locations = __data_columns[3:]
    for i in range(len(__locations)):
        __locations[i] = (__locations[i].lower()).title()
    global __model
    if __model is None:
        with open("./artifacts/house_prices_model_pickle","rb") as f:
            __model = pickle.load(f)
    print(__locations,__model,__data_columns)
    print("Loading Model Artifacts...done")


if __name__ == '__main__':
    load_model_artifacts()
    # checking if working properly
    print(get_house_locations())
