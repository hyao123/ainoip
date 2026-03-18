import { NextRequest, NextResponse } from 'next/server';
import {
  getAllWrongAnswers,
  addWrongAnswer,
  deleteWrongAnswer,
  updateWrongAnswerStatus,
  updateWrongAnswerNotes,
  getWrongAnswerStats,
  clearAllWrongAnswers,
  clearMasteredWrongAnswers,
  exportWrongAnswers,
  importWrongAnswers,
} from '@/lib/wrong-answers';

// GET - 获取错题列表或统计
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'stats':
        return NextResponse.json({ success: true, data: getWrongAnswerStats() });
      case 'export':
        return NextResponse.json({ success: true, data: exportWrongAnswers() });
      default:
        return NextResponse.json({ success: true, data: getAllWrongAnswers() });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取数据失败' },
      { status: 500 }
    );
  }
}

// POST - 添加错题或导入
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, problemId, userCode, errorMessage, jsonData } = body;

    switch (action) {
      case 'add':
        if (!problemId || !userCode) {
          return NextResponse.json(
            { success: false, error: '缺少必要参数' },
            { status: 400 }
          );
        }
        const newRecord = addWrongAnswer(problemId, userCode, errorMessage);
        return NextResponse.json({ success: true, data: newRecord });

      case 'import':
        if (!jsonData) {
          return NextResponse.json(
            { success: false, error: '缺少导入数据' },
            { status: 400 }
          );
        }
        const importResult = importWrongAnswers(jsonData);
        return NextResponse.json(importResult);

      default:
        return NextResponse.json(
          { success: false, error: '未知操作' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '操作失败' },
      { status: 500 }
    );
  }
}

// PUT - 更新错题状态或笔记
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: '缺少错题ID' },
        { status: 400 }
      );
    }

    if (status) {
      const updated = updateWrongAnswerStatus(id, status, notes);
      if (updated) {
        return NextResponse.json({ success: true, data: updated });
      }
    } else if (notes !== undefined) {
      const updated = updateWrongAnswerNotes(id, notes);
      if (updated) {
        return NextResponse.json({ success: true, data: updated });
      }
    }

    return NextResponse.json(
      { success: false, error: '错题不存在' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '更新失败' },
      { status: 500 }
    );
  }
}

// DELETE - 删除错题
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, clearAll, clearMastered } = body;

    if (clearAll) {
      clearAllWrongAnswers();
      return NextResponse.json({ success: true, message: '已清空所有错题' });
    }

    if (clearMastered) {
      const removed = clearMasteredWrongAnswers();
      return NextResponse.json({ success: true, message: `已清除 ${removed} 条已掌握的错题` });
    }

    if (id) {
      const deleted = deleteWrongAnswer(id);
      if (deleted) {
        return NextResponse.json({ success: true, message: '删除成功' });
      }
      return NextResponse.json(
        { success: false, error: '错题不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: '缺少参数' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '删除失败' },
      { status: 500 }
    );
  }
}
