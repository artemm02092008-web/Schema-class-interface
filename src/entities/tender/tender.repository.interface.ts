export interface ITenderRepository {
  create(data: { 
    title: string; 
    startingPrice: number; 
    startDate: Date; 
    endDate: Date; 
    managerId: number 
  }): Promise<any>;
  
  findAll(): Promise<any[]>;
}
