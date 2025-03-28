export type MealType = 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type DietaryPreference = 'All' | 'Pescatarian' | 'Vegan' | 'Meat-eater' | 'Gluten-Free' | 'Nut-Free' | 'Dairy-Free';

export interface Meal {
    id: number;
    name: string;
    calories: number;
    ingredients: string[];
    emojis: string[];
    time: string;
    dietaryTags: DietaryPreference[];
    isCompleted?: boolean;
} 