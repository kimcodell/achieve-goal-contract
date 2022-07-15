export default interface WritingPostDto {
  id?: number;
  userId?: number;
  title?: string;
  content?: string;
  distributionTokenAmount?: string;
  certificationStartDate?: string;
  certificationEndDate?: string;
  certificationCycle?: number; // 단위: 일
  certificationTime?: number; // 단위: 시(시간)
}
